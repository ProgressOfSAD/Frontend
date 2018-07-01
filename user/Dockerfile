#指定我们的基础镜像是node，版本是v8.0.0 指定的基础image可以是官方远程仓库中的，也可以位于本地仓库
	FROM node:8.0.0
	#指定维护者的信息
	MAINTAINER young
	#将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
    WORKDIR /user
	COPY . /user
	COPY cmd.sh /
#安装项目依赖包
	RUN npm install \
		&& npm rebuild node-sass --force
	#配置环境变量
	# ENV HOST 0.0.0.0
	ENV PORT 8080
	#容器对外暴露的端口号
	EXPOSE 8080
	#容器启动时执行的命令 每个Dockerfile只有一个CMD命令 多了则会覆盖之前的CMD
	CMD ["/cmd.sh"]