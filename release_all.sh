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
    -r=*|--release=*)
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

current_version=$(node -p "require('./core/package.json').version")

printf "\n"
echo "Previous version:   ${VERSION}"
echo "Next version:       ${VERSION}"
echo "Release type:       ${TYPE}"

# do the release pipeline

prefix="\n-> "

if [[ $VERSION = "default" ]] ; then
    echo 'Specify the next version number in argument, ex: -v=1.2.3'
    exit 0
fi

printf "$prefix Next version v$VERSION (previous: v$current_version)"
next_ref="v$VERSION"

  printf "$prefix Perform $TYPE checks for v$VERSION"
if [[ $TYPE = "pre-release" ]]; then
    ./core/release.sh $VERSION --pre
    ./react/release.sh $VERSION --pre
    printf "\nPre-release checks finished.\nPerform an actual release with the -r=<anything> flag"
    exit 0
fi

printf "$prefix Create release of v$VERSION"
./core/release.sh $VERSION
./react/release.sh $VERSION

printf "$prefix Create release commit and tag for v$VERSION"
printf "\n"
git add --all
git commit --allow-empty -am "Version $VERSION"
git tag $next_ref
git push origin master
git push origin $next_ref

printf "$prefix Release finished of $VERSION"
