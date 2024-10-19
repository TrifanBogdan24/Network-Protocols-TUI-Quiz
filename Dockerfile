FROM ubuntu:latest

WORKDIR /app

# Installing packages (dependencies)
RUN apt-get update && apt-get install -y \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (latest LTS version)
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

# Initialize a new Node.js project with "type": "module"
RUN echo '{ "type": "module" }' > package.json \
    && npm install @clack/prompts picocolors

COPY index.js .

# Running the TUI application when connecting to the container
ENTRYPOINT ["node", "index.js"]
