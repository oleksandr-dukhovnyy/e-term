#!/bin/bash

commit=$(git rev-parse --short HEAD);
build_folder="dist";
temp_folder="temp_deploy";
deploy_repo="https://github.com/Aleksandr-JS-Developer/EOS-terminal";
deploy_repo_name="EOS-terminal";
tag=$(git describe --tags --abbrev=0);
build_name="$tag-prod+$commit";

echo $build_name;

npm run build;
mkdir $temp_folder;
cd $temp_folder;

git clone $deploy_repo;

cd $deploy_repo_name;
ls | xargs rm -rf;

cd ../..;
cp -r $build_folder/. $temp_folder/$deploy_repo_name;

cd $temp_folder/$deploy_repo_name;

git add .;
git commit -m "$build_name";
git push;

cd ../..;

rm -rf $temp_folder;
rm -rf $build_folder;