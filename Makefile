NS = rancher
VERSION = $(shell ./scripts/version)

REPO = vm-frontend
NAME = vm-frontend
INSTANCE = default
BACKEND_SERVICE_HOST = localhost
BACKEND_SERVICE_PORT = 9500
PORT = 8000

.PHONY: build push shell run start stop rm release

build:
	docker build -t $(NS)/$(REPO):$(VERSION) .
	@echo Build $(NS)/$(REPO):$(VERSION) successful

stop:
	docker stop $(NAME)-$(INSTANCE)

run:
	docker run -d --name $(NAME)-$(INSTANCE) -p $(PORT):8000 -e BACKEND_SERVICE_HOST=$(BACKEND_SERVICE_HOST) -e BACKEND_SERVICE_PORT=$(BACKEND_SERVICE_PORT) $(NS)/$(REPO):$(VERSION)

default: build
