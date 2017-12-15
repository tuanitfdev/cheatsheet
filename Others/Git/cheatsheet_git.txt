Set up first config (when finish installing git)
  Set up user name
    git config --global user.name "Tuan Le"
  Set up email
    git config --global user.email tuancnttsp@gmail.com
    
Config ssh to use git with ssh
  Create file named "config" in ~/.ssh
  Refer: https://gist.github.com/tuancnttsp/23c86faa29bade642da527dece58d441

  Note: If have issue when connect ssh with public git repo. Should consider emptying the file named "known_hosts" in (~/.ssh) for sure

Config proxy to work with git if needed:
 In Git Bash:
  git config --global http.proxy http://10.10.10.10:8080

  export HTTP_PROXY="http://10.10.10.10:8080"
  export HTTPS_PROXY="http://10.10.10.10:8080"
  (Or config in windows environment variables)

To test connection with ssh the first time setup to connect with public git repo like github, bitbucket:
 In Git Bash:
  ssh -Tvv git@github.com
  Or
  ssh -Tvv git@bitbucket.org

Generate ssh key to work with public git repo:
 In Git Bash:
  ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

Add private key path to ssh-agent to work with public git repo with best experience
 In Git Bash:
  eval $(ssh-agent -s)  
  ssh-add ~/.ssh/id_rsa

Create a new repository
	create folder
	go to folder path
	git init (Create .git folder)
  git add . (Add all files to git track list)

Auto track remove all files delete outside (means delete file not use git rm)
  git add -u .
  OR
  git add -A .


Get list git config
  git config --list

Get list remote origin
  git remote (-v for more details)

Add origin to local existed repo
  git remote add origin <url>
  Ex:
    Add origin and upload first files to remote repo:
      git remote add origin git@bitbucket.org:tuancnttsp/test.git
      git push -u origin --all # pushes up the repo and its refs for the first time
      git push -u origin --tags # pushes up any tags

Checkout a repository (or clone remote repository to local)
	git clone /path/to/repo
	OR:
	git clone username@password@host:path/to/repo (when remote repo has credientials)

Check what file changes (summary)
	git status

Add changes to Index/stage status
	git add <filename>
	OR:
	git add . (for fast, * like .)	

Actually commit changes
	git commit -m "<comment>"
	git commit -am "<comment>": will do git add * then commit (don't have to type git add, but will only applies to all files that in track status)

Ignore tracked file temporarily:
  git update-index --assume-unchanged <path/to/file>
Start tracking again:
  git update-index --no-assume-unchanged <path/to/file>

Undo a commit and redo:

$ git commit ...              (1)
$ git reset --soft 'HEAD^'    (2)
$ edit                        (3)
$ git add ....                (4)
$ git commit -c ORIG_HEAD     (5)

(1)    This is what you want to undo

(2)    This is most often done when you remembered what you just committed is incomplete, or you misspelled your commit message, or both. Leaves working tree as it was before "reset". (The quotes may or may not be required in your shell)

(3)    Make corrections to working tree files.

(4)    Stage changes for commit.

(5)    "reset" copies the old head to .git/ORIG_HEAD; redo the commit by starting with its log message. If you do not need to edit the message further, you can give -C option instead.

Undo files that in staged status (when use "git add" then want to undo)
  git reset <path/to/file>

See diff part of 2 file or 2 revision of files
  git diff <revision1>:<path/to/file1> <revision2>:<path/to/file2>
  git diff <revision1> <revision2> <path/to/file1> (Often used)
  Ex:
    git diff HEAD^^ HEAD main.c

See list revision:
  git log

See list revision by format:
  git log --pretty=format:"%h - %an, %ar : %s"
  (%h: short revision, %an: author name, %ar: author date, %s: subject)

See list revision and show summary statistics:
  git log --stat
  git log --shortstat

See list revision by predefined format:
  git log --pretty=[option]
  [option]: oneline (show each commit in a single line), short, full, fuller

More useful option in "git log":
  --abbrev-commit: show SHA-1 checksum in short format
  --relative-date: relative format date
  --name-status: show the list of files affected with added/modified/deleted information as well
  -p: show patch (differences) in commit revision
  --graph: display an ASCII graph of the branch and merge history beside the log output
  [limit option]:
    --no-merges: ignore merge commit
    -<number>: show <number> revisions in list
    --since (--after): limit the commits to those made after the specified date
    --until (--before): limit the commits to those made after the specified date
    --author: only show author's commit
    --committer: only show committer's commit
  Ex:
    git log --pretty=oneline --abbrev-commit
          

See list file changes in revision (Only list file name):
  git diff-tree --name-only -r <revision>
  git ls-tree --name-only -r <revision>

See changes before changing current branch:
  git diff --name-status <branch_switching_to>

Remove files in repo and local
  git rm <path/to/file>
Remove files only in repo
  git rm --cached <path/to/file>
