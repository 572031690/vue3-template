# FROM registry.fpi-inc.site/library/fe-onbuild:latest
FROM registry.fpi-inc.site/library/node-dind:16.14.0-alpine as BUILD
# WORKDIR /build/
# COPY . /build/

# RUN yarn config set registry https://registry.npm.taobao.org && \
# #    yarn && \
# #    yarn build && \
#     mv /build/version /build/dist/version

# FROM registry.fpi-inc.site/library/nginx:1.15.0
# LABEL maintainer="梅纪飞<jifei_mei@fpi-inc.com>"
# COPY --from=BUILD /build/dist /home/fe/PROJECT_NAME
