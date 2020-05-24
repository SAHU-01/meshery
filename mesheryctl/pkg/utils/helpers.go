package utils

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"path"
	"runtime"
	"strings"

	"github.com/pkg/errors"

	log "github.com/sirupsen/logrus"
)

const (
	dockerComposeWebURL         = "https://api.github.com/repos/docker/compose/releases/latest"
	defaultDockerComposeVersion = "1.24.1/docker-compose"
	dockerComposeBinaryURL      = "https://github.com/docker/compose/releases/download/"
	dockerComposeBinary         = "/usr/local/bin/docker-compose"
)

var (
	// ResetFlag indicates if a reset is required
	ResetFlag bool
	// MesheryFolder is the default relative location of the meshery config
	// related configuration files.
	MesheryFolder = ".meshery"
	// DockerComposeFile is the default location within the MesheryFolder
	// where the docker compose file is located?
	DockerComposeFile = "meshery.yaml"
	// AuthConfigFile is the location of the auth file for performing perf testing
	AuthConfigFile = "auth.json"
)

// SafeClose is a helper function help to close the io
func SafeClose(co io.Closer) {
	if cerr := co.Close(); cerr != nil {
		log.Error(cerr)
	}
}

// DownloadFile from url and save to configured file location
func DownloadFile(filepath string, url string) error {
	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		return errors.Wrapf(err, "failed to make GET request to %s", url)
	}
	defer func() {
		_ = resp.Body.Close()
	}()
	// Create the file
	out, err := os.Create(filepath)
	if err != nil {
		return errors.Wrapf(err, "failed to create file %s", filepath)
	}
	defer func() {
		_ = out.Close()
	}()
	// Write the body to file
	_, err = io.Copy(out, resp.Body)
	if err != nil {
		return errors.Wrap(err, "failed to copy response body")
	}

	return nil
}

func prereq() ([]byte, []byte, error) {
	ostype, err := exec.Command("uname", "-s").Output()
	if err != nil {
		return nil, nil, errors.Wrap(err, "could not find os type")
	}

	osarch, err := exec.Command("uname", "-m").Output()
	if err != nil {
		return nil, nil, errors.Wrap(err, "could not find os arch type")
	}

	return ostype, osarch, nil
}

// SetFileLocation to set absolute path
func SetFileLocation() error {
	// Find home directory.
	home, err := os.UserHomeDir()
	if err != nil {
		return errors.Wrap(err, "failed to get users home directory")
	}
	MesheryFolder = path.Join(home, MesheryFolder)
	DockerComposeFile = path.Join(MesheryFolder, DockerComposeFile)
	AuthConfigFile = path.Join(MesheryFolder, AuthConfigFile)
	return nil
}

//PreReqCheck prerequisites check
func PreReqCheck() error {
	//Check for installed docker-compose on client system
	if err := exec.Command("docker-compose", "-v").Run(); err != nil {
		log.Info("Docker-Compose is not installed")
		//No auto installation of Docker-compose for windows
		if runtime.GOOS == "windows" {
			return errors.Wrap(err, "please install docker-compose")
		}
		err = installprereq()
		if err != nil {
			return errors.Wrap(err, "failed to install prerequisites")
		}
	}
	return nil
}

func installprereq() error {
	log.Info("Attempting Docker-Compose installation...")
	ostype, osarch, err := prereq()
	if err != nil {
		return errors.Wrap(err, "failed to get prerequisites")
	}

	osdetails := strings.TrimRight(string(ostype), "\r\n") + "-" + strings.TrimRight(string(osarch), "\r\n")

	dockerComposeBinaryURL := dockerComposeBinaryURL
	//checks for the latest docker-compose
	resp, err := http.Get(dockerComposeWebURL)
	if err != nil {
		dockerComposeBinaryURL = dockerComposeBinaryURL + defaultDockerComposeVersion
	} else {
		var dat map[string]interface{}
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			return errors.Wrap(err, "failed to read response body")
		}
		if err := json.Unmarshal(body, &dat); err != nil {
			return errors.Wrap(err, "failed to unmarshal json into object")
		}
		num := dat["tag_name"]
		dockerComposeBinaryURL = fmt.Sprintf(dockerComposeBinaryURL+"%v/docker-compose", num)
	}
	dockerComposeBinaryURL = dockerComposeBinaryURL + "-" + osdetails
	if err := DownloadFile(dockerComposeBinary, dockerComposeBinaryURL); err != nil {
		return errors.Wrapf(err, "failed to download %s from %s", dockerComposeBinary, dockerComposeBinaryURL)
	}
	if err := exec.Command("chmod", "+x", dockerComposeBinary).Run(); err != nil {
		return errors.Wrap(err, "failed to execute command")
	}
	log.Info("Prerequisite Docker Compose is installed.")
	return nil
}

// IsMesheryRunning checks if the meshery server containers are up and running
func IsMesheryRunning() bool {
	op, err := exec.Command("docker-compose", "-f", DockerComposeFile, "ps").Output()
	if err != nil {
		return false
	}
	return strings.Contains(string(op), "meshery")
}
