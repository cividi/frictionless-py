.PHONY: all install list spec test version


PACKAGE := $(shell grep '^PACKAGE =' setup.py | cut -d "'" -f2)
VERSION := $(shell head -n 1 $(PACKAGE)/VERSION)


all: list

install:
	pip install --upgrade -e .[develop,ods]

list:
	@grep '^\.PHONY' Makefile | cut -d' ' -f2- | tr ' ' '\n'

readme:
	pip install md-toc
	md_toc -p README.md github --header-levels 4
	sed -i '/(#$(PACKAGE)-py)/,+2d' README.md

spec:
	wget -O goodtables/spec.json https://raw.githubusercontent.com/frictionlessdata/data-quality-spec/master/spec.json

test:
	pylama $(PACKAGE)
	tox

version:
	@echo $(VERSION)
