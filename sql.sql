-- 创建数据库
CREATE DATABASE IF NOT EXISTS blog_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE blog_database;

-- 作者表 (users)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT COMMENT '主键',
    username VARCHAR(255) NOT NULL COMMENT '作者用户名',
    email VARCHAR(255) NOT NULL UNIQUE COMMENT '作者邮箱',
    password VARCHAR(255) NOT NULL COMMENT '密码，哈希加密存储',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '用户注册时间',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='作者表';

-- 文章表 (posts)
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT COMMENT '主键',
    title VARCHAR(255) NOT NULL COMMENT '文章标题',
    content TEXT NOT NULL COMMENT '文章内容',
    author_id INT NOT NULL COMMENT '作者 ID，外键关联到 users 表',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '文章创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '文章更新时间',
    PRIMARY KEY (id),
    INDEX (author_id),
    FOREIGN KEY (author_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章表';

-- 评论表 (comments)
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT COMMENT '主键',
    post_id INT NOT NULL COMMENT '文章 ID，外键关联到 posts 表',
    author_id INT NOT NULL COMMENT '评论者 ID，外键关联到 users 表',
    content TEXT NOT NULL COMMENT '评论内容',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '评论创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '评论更新时间',
    PRIMARY KEY (id),
    INDEX (post_id),
    INDEX (author_id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (author_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评论表';

-- 标签表 (tags)
CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT COMMENT '主键',
    name VARCHAR(255) NOT NULL UNIQUE COMMENT '标签名称',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='标签表';

-- 文章-标签关联表 (post_tags)
CREATE TABLE IF NOT EXISTS post_tags (
    post_id INT NOT NULL COMMENT '文章 ID，外键关联到 posts 表',
    tag_id INT NOT NULL COMMENT '标签 ID，外键关联到 tags 表',
    PRIMARY KEY (post_id, tag_id),
    INDEX (tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章-标签关联表';

-- 点赞表 (likes)
CREATE TABLE IF NOT EXISTS likes (
    id INT AUTO_INCREMENT COMMENT '主键',
    ip_address VARCHAR(255) NOT NULL COMMENT '点赞用户的 IP 地址',
    user_agent TEXT COMMENT '点赞用户的 User-Agent 信息',
    type ENUM('post', 'comment') NOT NULL COMMENT '点赞类型，可以是文章或评论的标识',
    target_id INT NOT NULL COMMENT '被点赞对象的 ID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
    PRIMARY KEY (id),
    INDEX (ip_address),
    INDEX (type, target_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='点赞表';
