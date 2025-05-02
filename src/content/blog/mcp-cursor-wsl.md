---
title: "Best way to use MCP Servers with Cursor in WSL"
description: "Do not lose faith, we can avoid the horrors of Windows with MCP!"
pubDate: "May 02 2025"
heroImage: "/blog-placeholder-1.jpg"
---

Cursor when it's install on Windows and remoting into a WSL instance has an annoying limitation. Per https://docs.cursor.com/context/model-context-protocol#remote-development:

> Cursor directly communicates with MCP servers from your local machine, either directly through `stdio` or via the network using `sse`. Therefore, MCP servers may not work properly when accessing Cursor over SSH or other development environments. We are hoping to improve this in future releases.

A lot of MCP tools are heavily integrated with your workspaces and the tools in them, and in WSL those are usually Linux installed tools (e.g Node scripts running on WSL Node.js\/Bun) that you won't be able to access by default. Since a lot of people use WSL explicitly so they don't have to deal with the hell that is Windows command line (I'm still burned by the path limitations), we have a Problem.

Easy enough solution it turns out.

First, we can't use the global MCP json as that's configured in the cursor windows config. Instead you want to use a project config inside `.cursor/mcp.json`

A typical mcp server string you might get will look like this

```bash
npx -y convex@latest mcp start
```

You need to run it via the `wsl bash` command. The config will look like this:

```json
{
  "mcpServers": {
    "convex": {
      "command": "wsl",
      "args": ["bash", "-c", "'npx -y convex@latest mcp start'"]
    }
  }
}
```

Thanks to this [post](https://forum.cursor.com/t/run-mcp-servers-in-wsl/55537/18) for the original assistance.
