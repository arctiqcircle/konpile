# The Konfiguration Compiler

![Konpile Logo](/static/img/konpile_128x128.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://mit-license.org)
[![Docker Hub](https://img.shields.io/badge/Docker-dyntek%2Fkonpile-2496ED?logo=docker&logoColor=2496ED)](https://hub.docker.com/r/dyntek/konpile)
[![Website](https://img.shields.io/badge/Web%20Service-konpile.dynteklabs.com-006c05?logo=microsoftedge&logoColor=green)](https://konpile.dynteklabs.com)

Konpile is a tool for generating configuration files from data files. This is useful for generating large and complex configuration files for network and security devices. Konpile is written in Python and uses the [Jinja2](https://jinja.palletsprojects.com/en/3.1.x/templates/) templating language. Konpile can be used as a web service, a Docker container, or a Python script.

- [The Konfiguration Compiler](#the-konfiguration-compiler)
- [Getting Started](#getting-started)
  - [Konpile for Web](#konpile-for-web)
  - [The Docker Container](#the-docker-container)
  - [The Terminal](#the-terminal)
- [Overview of Schemas](#overview-of-schemas)
  - [Data Files](#data-files)
  - [Templates](#templates)
- [Sponsorship](#sponsorship)

# Getting Started

## Konpile for Web

For your immediate use, a Konpile web service is hosted by [The Dyntek Labs](https://www.dynteklabs.com) and is made available at [https://konpile.dynteklabs.com](https://konpile.dynteklabs.com). The web service will allow you to upload data files and write a template. The template can be rendered and the output will be downloaded. This method will not allow you to use translation files, but will allow you to use multiple data files and explore your variables before rendering.

## The Docker Container

Often times, you'd like the peace of mind from processing your configurations on your own infrastructure. The easiest way to get started with Konpile yourself is via the Docker container. Konpile is available as a stateless and portable web service from a [Docker](https://www.docker.com/) image. Install Docker from [here](https://docs.docker.com/get-docker/) and then pull and start the container:

```bash
docker pull dyntek/konpile
docker run -d -p 8080:8080 dyntek/konpile
```

In this example, the web service will be available at [http://localhost:8080](http://localhost:8080) as well as any other IP address that is available to your Docker host.

## The Terminal

Install Git from [here](https://git-scm.com/downloads) and clone the repository:

```bash
git clone https://github.com/dyntek-services-inc/konpile.git
```

Install Python3 from [here](https://www.python.org/downloads/) and then install the dependencies:

```bash
pip install -r requirements.txt
```

_Output of -h (help)_

```bash
python konpile.py -h
usage: konpile.py [-h] [--translation TRANSLATION [TRANSLATION ...]] template_file data_file

Use an Excel file to fill a Jinaj2 template.

positional arguments:
  template_file         Jinja2 template file
  data_file             File with data

options:
  -h, --help            show this help message and exit
  --translation TRANSLATION [TRANSLATION ...], -t TRANSLATION [TRANSLATION ...]
                        Translation CSV files
```

The translation files can be used to translate values from the Excel file to values used in the template. This is useful for translating values from one format to another without altering the original document. For example, translating a VLAN name to a VLAN ID.

# Overview of Schemas

## Data Files

You may use JSON, CSV, and Excel files to provide data to Konpile. When JSON is used, the data is pulled directly from the JSON file and is made available in the same format as the JSON file.

When CSV is used, the data is pulled from the CSV file into a list of key-value pairs. The first row of the CSV file, the header, defines variable names for the template.

When Excel is used, data is pulled from the Excel file sheet by sheet. Like with CSV, the first row of each sheet is used as the variable names to be passed along to the template. However, unlike CSV, fields containing comma separated values in the Excel document are split into a list of values. This is useful for defining multiple values for a single variable.

## Templates

Konpile uses the [Jinja2](https://jinja.palletsprojects.com/en/3.1.x/templates/) templating language. Jinja2 is a powerful industry standard templating language used in a variety of applications. Konpile uses Jinja2 to render a template file with the data provided from the data files. The template file is a plain text file with the `.j2` extension.

_An example template file:_
```
{% for line in sheet_name %}
{{ line.column_name1 }}
{% endfor %}
```

In the above example, this template will render a value `column_name1` for each row, or `line`, in the specified sheet, `sheet_name`.

Learning to write a good template, one which can leverage the power of the Jinja2 templating language, is the most difficult part of using Konpile. The [Jinja2 Template Designer Documentation](https://jinja.palletsprojects.com/en/3.1.x/templates/#the-template-designer-s-guide) is a great place to learn about the Jinja2 templating language. To aid you in learning Jinja2, Konpile is shipped with a few example templates. These templates can be found in the `samples` directory.

# Sponsorship

[![DynTek](/static/img/dyntek_64x64.png)](https://www.dyntek.com)
[![Dyntek Labs](/static/img/dynteklabs_64x64.png)](https://www.dynteklabs.com)

This project is sponsored by [Dyntek](https://www.dyntek.com) and maintained by their working group, [The Dyntek Labs](https://www.dynteklabs.com). Dyntek is a leading provider of professional services and managed solutions for advanced IT infrastructure, data center, cloud, and security.

The Dyntek Labs is a research and development group within Dyntek that focuses on developing new and innovative solutions to enable ourselves, our customers, and the community to be more efficient and secure.
