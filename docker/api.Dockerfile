FROM fakebook_backend_base

WORKDIR /workspace

COPY . .

EXPOSE 3000

CMD ["npm", "start", "&&", "npm", "install"]
