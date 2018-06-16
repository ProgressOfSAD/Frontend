# Frontend[![Build Status](https://travis-ci.org/ProgressOfSAD/Frontend.svg?branch=master)](https://travis-ci.org/ProgressOfSAD/Frontend)
user 为用户前端
admin 为管理员前端
# lsfr

> A Vue.js project

## Build Setup

``` bash

# docker build
docker build -t lsfr .

# docker run
docker run -e  'ENV=DEV' -p 8000:9528 lsfr

#docker run unit test
docker run -e  'ENV=UNIT' -p 8000:9528 lsfr

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
