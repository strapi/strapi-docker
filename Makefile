.PHONY: all
all:
	@./bin/build.js --type=all

.PHONY: base
base:
	@./bin/build.js --type=base

.PHONY: strapi
strapi:
	@./bin/build.js --type=strapi