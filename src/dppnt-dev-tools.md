# IDE
## JetBrains IDE
### Shortcuts
ctrl + shift + a: actions -> soft wrap
### Common issues
IDE is extremely slow listing directory contents in Project view
https://youtrack.jetbrains.com/issue/IJPL-2199/IDE-is-extremely-slow-listing-directory-contents-in-Project-view

## Pycharm
### Pycharm Issue And Troubleshooting
#### Debug show source on remote
debug or open declaration file will opening cache local source file in pycharm ide:
https://intellij-support.jetbrains.com/hc/en-us/community/posts/9555194175762-Remote-debugging-opens-up-in-remote-sources-folder

Workaround:
mark root folder as source root then unmark then mark source root again
config source path mapping
restart ide or clear cache (invalidate cache)


#### Create Debug Python Server on Pycharm with remote project on ubuntu server vmware guest access from win 10 host
https://www.youtube.com/watch?v=8UOQf1X8xSk


#### Cannot specify existing remote virtualenvs
Workaround:
Create remote virtualenvs, then update that folder after that using poetry or remote virtualenvs cmd
Some notes when reasearch a fix for this:

https://youtrack.jetbrains.com/issue/PY-71771/Remote-Python-interpreter-is-invalid-after-upgrading-to-2024.1
Same issue, can't use or configure remote ssh interpreter with PyCharm 2024.1.

Platform macOS Sonoma 14.4.1.

Downgraded to 2023.3.5 and deleted/recreated configs for ssh, deployment, and interpreter. Works fine.

Did it ALL again, just to be sure.

https://youtrack.jetbrains.com/issue/PY-29551/No-way-to-activate-virtualenv-for-remote-interpreter-including-SSH-session-and-external-tools
I addressed this by creating a very small shim shell script:

#!/bin/sh
. /home/me/mypy/venv/bin/activate
exec python $*

Then, make this script executable (chmod a+x) and set it as the remote interpreter in the Pycharm Settings / Project Settings / Python Interpreter / Show All / Edit pane.

For example, I call this script /home/me/mypy/python-venv, so that's what I tell Pycharm for the path to python on the remote system.

When Pycharm ssh's into the remote machine and calls this script, thinking it has started python, the script will activate the venv and then invoke the real python binary in the context of the venv.

This seems to work in my testing to enable me to use Python built from source and a venv on the remote system.

This also has the benefit of requiring no changes to login files on the remote system, nor the need to maintain a venv in Pycharm and push it back and forth to the remote system.

I also successfully pip'd pandas into the remote venv simply by adding it to requirements.txt and Pycharm's install feature. So Pycharm seems to be (correctly) invoking pip through "python -m pip."

https://youtrack.jetbrains.com/issue/PY-63609/Impossible-to-add-existing-Python-remote-interpreter-venv-permission-denied
unfortunately the commands related to venv creation didn't appear in the extended log messages. Maybe the debug option was added after reproducing the issue? Could you please double check that the #com.intellij.execution.configurations.GeneralCommandLine option is still present in debug log settings, then restart PyCharm, reproduce the issue once more, and provide updated log?




## VsCode
### VsCode Issue And Troubleshooting
#### Tab size not work properly by vscode settings:
1.	Sometimes because of indent space in file not consistent at different places will cause this issue,
just change following settings of vscode:
```json
{
	"editor.detectIndentation": false,
}
```

2.	Indent auto update by Markdown All in One (for markdown file only), just make this extension
respect vscode settings by config following field:
```json
{
	"markdown.extension.list.indentationSize": false,
}
```

#### Config hot quit app without save file
```json
{
	"files.hotExit": "onExitAndWindowClose",
	"files.autoSave": "afterDelay",
	"files.autoSaveDelay": 1000,
}
```

#### All usual vscode settings
```json
{
	"workbench.startupEditor": "welcomePage",
	"vim.easymotion": true,
	"editor.fontSize": 16,
	"vim.useSystemClipboard": true,
	"vim.ignorecase": true,
	"vim.smartcase": true,
	"vim.leader": "<Space>",
	"vim.handleKeys": {
			"<C-v>": false,
			"<C-d>": true,
			"<C-s>": false,
			"<C-z>": false,
			"<C-p>": false,
	},
	"files.hotExit": "onExitAndWindowClose",
	"files.autoSave": "afterDelay",
	"files.autoSaveDelay": 1000,
	"editor.detectIndentation": false,
	"markdown.extension.list.indentationSize": "inherit",
	"markdown.copyFiles.destination": {
			"/**/*": "img/"
	},
	"prettier.resolveGlobalModules": true,
	"prettier.prettierPath": "c:/Users/tuan/AppData/Local/Yarn/Data/global/node_modules/prettier/index.cjs",
	// "prettier.configPath": "d:/Users/tuan/.prettierrc.js",
	// "editor.indentSize": "tabSize",
	// "editor.tabSize": 2,
	"editor.formatOnPaste": false,
	"editor.formatOnType": false,
	"editor.formatOnSave": false,
	"[markdown]": {
					"editor.defaultFormatter": "esbenp.prettier-vscode", // Ensure Prettier is the default formatter
			// "editor.defaultFormatter": "yzhang.markdown-all-in-one",
	//   "editor.indentSize": "tabSize",
	//   "editor.tabSize": 2,
	},
	"[javascript]": {
					// "editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"javascript.updateImportsOnFileMove.enabled": "always",
	"security.restrictUNCAccess": false,
}
```
