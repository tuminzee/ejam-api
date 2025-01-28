.PHONY: up down watch clean help prune logs stats

# Default target when just running 'make'
help:
	@echo "Available commands:"
	@echo "  make up        - Start all containers in detached mode"
	@echo "  make up-watch  - Start all containers and watch logs"
	@echo "  make down      - Stop and remove all containers"
	@echo "  make watch     - Watch logs of all containers"
	@echo "  make logs      - Show logs of all containers"
	@echo "  make clean     - Remove all containers, images, and volumes"
	@echo "  make prune     - Remove unused Docker resources"
	@echo "  make stats     - Show container resource usage"

# Start containers
up:
	docker-compose up -d

# Start containers and watch logs
up-watch:
	docker-compose up

# Stop and remove containers
down:
	docker-compose down

# Watch container logs
watch:
	docker-compose logs -f

# Show container logs
logs:
	docker-compose logs

# Show container resource usage
stats:
	docker stats

# Clean everything
clean:
	docker-compose down -v
	docker system prune -af --volumes

# Remove unused resources
prune:
	@echo "Cleaning unused containers..."
	docker container prune -f
	@echo "Cleaning unused images..."
	docker image prune -f
	@echo "Cleaning unused volumes..."
	docker volume prune -f
	@echo "Cleaning unused networks..."
	docker network prune -f

# Service-specific commands (customize as needed)
up-%:
	docker-compose up -d $*

watch-%:
	docker-compose logs -f $*

restart-%:
	docker-compose restart $*
