FROM node:22-alpine AS builder
# DÙng image Node.js (nhẹ, alpine) để build code
#as builder = đặt tên stage ( multi-stage build)

WORKDIR /app
#tạo thư mục /app trong container
# tất cả lệnh sau này chạy trong đó.

COPY package*.json ./
# cóp thư mục package.json, package-lock.json 
# k cóp hêt để tận dụng cache docker (builder nhanh hơn)
RUN npm ci
# cài dependencies để chạy theo lock fie
COPY . .
# cóp pi toàn bộ sourse code vào trong container
RUN npm run build
#Build React -> tạo thư mục /dist
# Đây là phần output proiduction ( html + js + css)

FROM nginx:alpine
# dùng nginx để serve file tĩnh 
# nhẹ hơn node rất nhiều 
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# cóp file config nginx vào container
COPY --from=builder /app/dist /usr/share/nginx/html
# lấy kết quả build từ stage 1 để vào thư mục nginx
#/usr/share/nginx/html
# đây là nơi nginx serve web
EXPOSE 80
# mở port 80 ( web)
CMD [ "nginx","-g","daemon off;" ]
# chạy nginx ở foregroind , nếu k có -> container tư tắt
#---> build bawgf node -> chạy bằng nginx
# giải thchis foreground là gì? 
# Hiểu đơn giản

## Foreground = chạy ở phía trước (giữ process sống)
# Background = chạy ẩn

#Trong Docker:
#CMD ["nginx","-g","daemon off;"]

# daemon off = chạy foreground

#Tại sao phải làm vậy?

# Docker chỉ sống khi process chính còn chạy

#Nếu không có:

#Nginx sẽ chạy background → Docker nghĩ là xong → container tắt luôn

#Ví dụ dễ hiểu
#Trường hợp	Kết quả
#chạy foreground	container sống
#chạy background	container chết
#Tư duy

# Docker = “chạy 1 process chính”
# process đó phải ở foreground