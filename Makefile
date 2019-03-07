VERSION = $(shell ./scripts/version)

REPO = rancher
NAME = vm-frontend
INSTANCE = default
BACKEND_SERVICE_HOST = localhost
BACKEND_SERVICE_PORT = 9500
PORT = 8000
IMAGE = $(REPO)/$(NAME):$(VERSION)

.PHONY: build push shell run start stop rm release

build:
	docker build -t $(IMAGE) --build-arg VERSION=$(VERSION) .
	@echo Build $(IMAGE) successful
	@mkdir -p bin
	@echo $(IMAGE) > bin/latest_image

stop:
	docker stop $(NAME)-$(INSTANCE)

run:
	docker run -d --name $(NAME)-$(INSTANCE) -p $(PORT):8000 -e BACKEND_SERVICE_HOST=$(BACKEND_SERVICE_HOST) -e BACKEND_SERVICE_PORT=$(BACKEND_SERVICE_PORT) $(REPO)/$(NAME):$(VERSION)

default: build
