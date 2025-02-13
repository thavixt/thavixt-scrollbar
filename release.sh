#!/bin/bash -e

if [[ $# -eq 0 ]] ; then
    echo 'Specify version number in argument'
    exit 0
fi

current_version=$(node -p "require('./core/package.json').version")
next_version=$1

printf "Next version $next_version (previous: $current_version)"

next_ref="v$next_version"

./core/release.sh $next_version --pre
./react/release.sh $next_version --pre

git commit --allow-empty -am "Version $next_version"
git tag $next_ref
git push origin master
git push origin $next_ref

./core/release.sh $next_version
./react/release.sh $next_version
