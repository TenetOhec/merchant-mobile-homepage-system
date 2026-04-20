# 上线步骤

这份项目最简单的上线方式是：

- 买一台 Ubuntu 服务器
- 把项目上传到服务器
- 用 `pm2` 跑后端
- 用 `nginx` 提供前端页面并反代 `/api`
- 用 `nginx` 做一层账号密码访问控制

下面按顺序操作。

## 1. 准备一台服务器

建议配置：

- `Ubuntu 22.04 LTS`
- `2 核 2G` 即可
- 开通公网 IP

如果你还没有买，腾讯云轻量应用服务器或阿里云 ECS 都可以。

## 2. 确认你的访问方式

现在默认推荐你用 `Nginx 基础认证`，也就是让你朋友通过一个账号密码访问页面。

优点：

- 不依赖固定 IP
- 不需要改项目代码
- 部署复杂度最低

如果以后你想改成“邮箱验证码登录”这种方式，可以再接 Cloudflare Access。

## 3. 登录服务器

本地终端执行：

```bash
ssh root@你的服务器公网IP
```

首次登录一般会提示确认指纹，输入 `yes`。

## 4. 安装基础环境

在服务器执行：

```bash
apt update
apt install -y curl git nginx apache2-utils
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2
```

检查版本：

```bash
node -v
npm -v
pm2 -v
nginx -v
```

## 5. 上传项目到服务器

有两种方式，任选一种。

### 方式 A：项目已经在 Git 仓库

服务器执行：

```bash
mkdir -p /srv
cd /srv
git clone 你的仓库地址 project
cd /srv/project
```

### 方式 B：本机直接上传

在你自己的电脑执行：

```bash
scp -r /Users/air/Desktop/project root@你的服务器公网IP:/srv/project
```

上传完后，重新 SSH 登录服务器：

```bash
ssh root@你的服务器公网IP
cd /srv/project
```

## 6. 安装依赖并构建

服务器执行：

```bash
cd /srv/project
npm install
npm run build
```

成功后会有这些关键产物：

- 前端静态文件：`/srv/project/frontend/dist`
- 后端构建结果：`/srv/project/backend/dist`

## 7. 启动后端

项目里已经给你准备好了 `PM2` 配置文件：

- [deploy/ecosystem.config.cjs](/Users/air/Desktop/project/deploy/ecosystem.config.cjs)

把它复制到服务器项目目录后，执行：

```bash
cd /srv/project
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup
```

查看状态：

```bash
pm2 status
pm2 logs merchant-backend --lines 100
```

后端默认会监听：

- `0.0.0.0:4000`

这只是给服务器本机和 `nginx` 用的，不要直接对公网开放 `4000`。

## 8. 配置 Nginx 账号密码

项目里已经给你准备好了模板：

- [deploy/nginx.conf](/Users/air/Desktop/project/deploy/nginx.conf)

先在服务器创建访问账号，下面示例用户名是 `friend`：

```bash
htpasswd -c /etc/nginx/.htpasswd friend
```

执行后系统会提示你输入两次密码，这个密码就是你朋友访问网站时要输入的密码。

如果以后还想再加一个账号，比如你自己的账号：

```bash
htpasswd /etc/nginx/.htpasswd me
```

然后在服务器执行：

```bash
cp /srv/project/deploy/nginx.conf /etc/nginx/sites-available/merchant
ln -sf /etc/nginx/sites-available/merchant /etc/nginx/sites-enabled/merchant
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

如果 `nginx -t` 报错，先不要 reload，把报错发出来再处理。

## 9. 配置云防火墙 / 安全组

这一步还是要做，但现在不用按朋友 IP 限制了。

你在云厂商控制台里把入站规则改成下面这样：

- `22`：只允许你的公网 IP，方便你 SSH 登录
- `80`：允许公网访问
- `443`：如果以后配 HTTPS，也允许公网访问
- 不开放 `4000`

## 10. 打开页面测试

让你朋友直接访问：

```text
http://你的服务器公网IP
```

如果你自己也加了白名单，你也可以直接访问。

### 正常情况下应该看到

- 浏览器先弹出账号密码输入框
- 首页能打开
- 页面数据能加载
- 页面内修改配置能生效
- 刷新后数据仍然存在

## 11. 常用运维命令

### 重启后端

```bash
cd /srv/project
pm2 restart merchant-backend
```

### 查看后端日志

```bash
pm2 logs merchant-backend --lines 100
```

### 重新发布代码

如果你是 `git clone` 上去的：

```bash
cd /srv/project
git pull
npm install
npm run build
pm2 restart merchant-backend
systemctl reload nginx
```

如果你是 `scp` 上传的，就重新上传后再执行：

```bash
cd /srv/project
npm install
npm run build
pm2 restart merchant-backend
systemctl reload nginx
```

## 12. 常见问题

### 页面能打开，但数据请求失败

先检查后端是否正常：

```bash
pm2 logs merchant-backend --lines 100
curl http://127.0.0.1:4000/api/health
```

如果健康检查返回 JSON，说明后端基本正常，再检查 `nginx`。

### 外网打不开

按顺序检查：

1. 云防火墙 / 安全组是否放行了正确端口
2. `nginx` 是否启动
3. `/etc/nginx/.htpasswd` 是否存在
4. `nginx` 配置是否已经 reload

### 刷新页面 404

说明 `nginx` 没有正确配置：

```nginx
try_files $uri $uri/ /index.html;
```

## 13. 建议你现在就做的事情

按这个顺序最省事：

1. 买一台 Ubuntu 服务器
2. 把项目传上去
3. 执行 `npm install && npm run build`
4. 用 `pm2` 启后端
5. 创建 `nginx` 访问账号密码
6. 用 `nginx` 挂前端
7. 在云控制台配置安全组

## 参考文档

- Nginx 基础认证
  - https://nginx.org/en/docs/http/ngx_http_auth_basic_module.html
- 阿里云安全组说明
  - https://www.alibabacloud.com/help/en/ecs/user-guide/overview-44
- 阿里云安全组使用
  - https://www.alibabacloud.com/help/en/ecs/user-guide/manage-ecs-instances-in-security-groups
- 腾讯云轻量应用服务器防火墙
  - https://cloud.tencent.com/document/product/1207/44577/
