#!/bin/bash
set -e
set -o pipefail

VERSION="default"
TYPE="pre-release"

for i in "$@"; do
  case $i in
    -v=*|--version=*)
      VERSION="${i#*=}"
      shift # past argument=value
      ;;
    -r|--release)
      TYPE="release"
      shift # past argument=value
      ;;
    -*|--*)
      echo "Unknown option $i"
      exit 1
      ;;
    *)
      ;;
  esac
done

PREV_VERSION=$(node -p "require('./core/package.json').version")
VERSION_FILE="./.version"
current_dt="`date +%Y%m%d%H%M%S`";
latest_commit="`git rev-parse --short HEAD`";
latest_commit_short="`git rev-parse HEAD`";

printf "\n"
echo "Previous version:   ${PREV_VERSION}"
echo "Next version:       ${VERSION}"
echo "Commit:             ${latest_commit_short}"
echo "Release type:       ${TYPE}"

printf "version:\tv$VERSION\ncommit:\t\t$latest_commit\ndate:\t\t\t$current_dt" > $VERSION_FILE
exit

# do the release pipeline

prefix="\n-> "

if [[ $VERSION = "default" ]] ; then
    echo 'Specify the next version number in argument, ex: -v=1.2.3'
    exit 0
fi

printf "$prefix Next version v$VERSION (previous: v$PREV_VERSION)"
next_ref="v$VERSION"

printf "$prefix Perform $TYPE checks for v$VERSION"

./core/release.sh $VERSION --pre
./react/release.sh $VERSION --pre
if [[ $TYPE = "pre-release" ]]; then
  printf "\nPre-release checks finished.\nPerform an actual release with the -r|--release flag"
  exit
fi

printf "$prefix Create release of v$VERSION"
./core/release.sh $VERSION
./react/release.sh $VERSION

# write out info about the newly created version
$VERSION_FILE=".version"
echo $VERSION > $VERSION_FILE

printf "$prefix Create release commit and tag for v$VERSION"
printf "\n"
git add --all
git commit --allow-empty -am "Version $VERSION"
git tag $next_ref
git push origin main
git push origin $next_ref

printf "$prefix Release finished of $VERSION (previous: $PREV_VERSION)"
