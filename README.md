# mktouch

> `touch` command with **auto directory creation** — works on Windows, Mac & Linux

## Problem

```bash
touch src/client/dto/create-client.dto.ts
# ❌ Error: no such file or directory (if dto/ folder doesn't exist)
```

## Solution

```bash
mktouch src/client/dto/create-client.dto.ts
# ✔ Created: src/client/dto/create-client.dto.ts  (folders bhi bana diye!)
```

## Install

```bash
npm install -g mktouch
```

## Usage

```bash
# Single file
mktouch src/client/dto/create-client.dto.ts

# Multiple files at once
mktouch src/user/user.service.ts src/user/user.controller.ts src/user/dto/create-user.dto.ts
```

## Features

- ✅ Auto-creates missing folders (like `mkdir -p`)
- ✅ Works on **Windows, Mac & Linux**
- ✅ Multiple files in one command
- ✅ Updates timestamp if file already exists (original `touch` behavior)
- ✅ Zero dependencies

## License

MIT