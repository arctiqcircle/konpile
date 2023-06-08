# konpile - Konfiguration Compiler

Use an Excel file to fill a configuration template. This is useful for generating configuration files for network and security devices. The template is defined in a [Jinja2](https://jinja.palletsprojects.com/en/3.1.x/templates/) template file. Data is pulled from the Excel file sheet by sheet. The first row of each sheet is used as the column names. The column names are used as the variable names in the template. The data is then rendered into the template and the output is written to a file.

_An example template file:_
```
{% for line in sheet_name %}
{{ line.column_name1 }}
{% endfor %}
```

This template file will be rendered for each row in the specified sheet, `sheet_name`. The column names are used as the variable names for each row. In this example, the first row of the sheet must contain a column named `column_name1`.

# Getting Started

## The Web GUI

The easiest way to get started with Konpile is via the Web GUI. Konpile available as a web service from a [Docker](https://www.docker.com/) image. Install Docker from [here](https://docs.docker.com/get-docker/) and then pull and start the container:

```bash
docker pull dyntek/konpile
docker run -d -p 8080:8080 dyntek/konpile
```

In this example, the web service will be available at http://localhost:8080. The web service can be accessed from any web browser. The web service will allow you to upload an Excel file, write a template file, and optionally upload some translation files. 

The translation files can be used to translate values from the Excel file to values used in the template. This is useful for translating values from one format to another without altering the original document. For example, translating a VLAN name to a VLAN ID.

## The Terminal

Install Git from [here](https://git-scm.com/downloads) and clone the repository:

```bash
git clone https://github.com/dyntek-services-inc/konpile.git
```

Install Python3 from [here](https://www.python.org/downloads/) and then install the dependencies:

```bash
pip install -r requirements.txt
```

### Usage

```bash
python konpile.py -h
usage: konpile.py [-h] [--translation TRANSLATION [TRANSLATION ...]] template_file data_file

Use an Excel file to fill a Jinaj2 template.

positional arguments:
  template_file         Jinja2 template file
  data_file             Excel file with data

options:
  -h, --help            show this help message and exit
  --translation TRANSLATION [TRANSLATION ...], -t TRANSLATION [TRANSLATION ...]
                        Translation CSV files
```