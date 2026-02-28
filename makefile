.PHONY: build up

build:
	docker-compose -f infra/docker-compose.yaml build

up-dev:
	docker-compose -f infra/docker-compose-dev.yaml up -d

down-dev:
	docker-compose -f infra/docker-compose-dev.yaml down
