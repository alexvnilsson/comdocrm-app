#!/bin/sh
# Automated deploy process for ComdoCRM application.

#### Exit codes ####
# 111: File "package.json" not in working dir., may not find source code.

ERR_INVALID_WORKING_DIRECTORY=111

####################

#### Colors ####

RED='\033[0;31m'

################

OUTPUT_PATH=/var/www/@comdocrm/app

if [ ! -w $OUTPUT_PATH ]; then
  echo "${RED}ERROR: EACCES: '${OUTPUT_PATH}' is not writable with current permissions."
  exit 13
fi

PACKAGE="package.json"

if [ ! -f "$PACKAGE" ]; then
  echo "Could not find file 'package.json' in working directory."
  exit $ERR_INVALID_WORKING_DIRECTORY
fi

ng build \
--environment=prod \
--output-path="$OUTPUT_PATH"