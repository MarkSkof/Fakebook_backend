FROM fakebook_backend_base

WORKDIR /workspace

COPY . .

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]
