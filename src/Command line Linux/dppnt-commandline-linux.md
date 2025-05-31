--Ubuntu OS--
--Made by LE TRAN ANH TUAN

--------------
Convention:
	C: Control key
	M: Alt key
	BS: Backspace key

--------------
Move Pointer:
	C-A: Move pointer to beginning of line
	C-E: Move pointer to end of line
	C-F: Move pointer to next character
	C-B: Move pointer to previous character
	M-F: Move pointer to next word
	M-B: Move pointer to previous word

--------------
Delete:
	C-U: Delete from pointer to beginning of line (copy to buffer, use C-Y to paste)
	C-K: Delete from pointer to end of line (copy to buffer, use C-Y to paste)
	C-D: Delete from pointer to one character forward
	BS: Delete from pointer to one character backward
	C-W: Delete from pointer to one word backward (word convented as all characters except whitespace) (but it will copy to buffer, use C-Y to paste)
	M-BS: Delete from pointer to one word backward (usual word not like above) (copy to buffer, use C-Y to paste)
	M-D: Delete from pointer to one word forward (usual word like above) (copy to buffer, use C-Y to paste)

--------------
Search:
	C-R: Reverse searching (type and show result by a character)
	When in Reverse searching mode:
		C-G: return to origin command at the beginning
		C-J: go to command line result from searching
	C-S: Forward searching
	Note:
	  You must activate it by disabling Ctrl-S default in terminal startup, use the following command:
		stty -ixon
	  Enable it again by the following command:
		stty ixany

	C-P: go to previous command line in history
	C-N: go to next command line in history
	M-<: go to first command line in history
	M->: go to last command line in history

--------------
Other Command Tips:
	M-D: Exit (logout)
	C-T: Transpose two characters at pointer (current and previous character)
	M-T: Transpose two words at pointer (current and previous word)
	M-U: Uppercase word at current pointer
	M-L: Lowercase word at current pointer
	M-C: Capitalize (uppercase first character of word) word at current pointer
	C-L: Redraw command screen
	M-.: Show last argument of previous command (repeat to find appropriate argument)
	M-0,M-.: Show first argument (usually as command) (C-M-Y do the same as M-.) (0 can be replaced by another digit from 1-9 to get nth oridinal number argurment)
	M+"-"+[digit(1-9)],M-.: get argument like above but count argument from end of line backward (because it's a negative number)
	View more at ref "http://stackoverflow.com/questions/4009412/bash-first-argument-of-the-previous-command?rq=1" and "http://lifehacker.com/5743814/become-a-command-line-ninja-with-these-time+saving-shortcuts"
	!!: repeat last previous command (!!:p to show last previous command)
	!$: repeat last argument from last previous command (!$:p to show like above)
	!cp: repeat last command line start with 'cp' (!:cp:p to show that command line)
	!cp:1: repeat first argument last command line start with 'cp' (!:cp:p to show that argument, 1 can be "^": first argument or "$": last argument)
	"!*:p" : show all arguments from last command
	"!cp:1*:p : show from 1th argument to end of line
	"!cp:-3:p : show from 3th argument to beginning of line (note: can't use * like above if it's negative number)

--------------
Install utility (software) commands:
	apt-get install <package>: install package from repository
	apt-cache policy <package>: check package has been installed from repository (OR dpkg -l | grep <package>) and also know which version (only apt-cache policy had)

--------------
Switch to tty (real terminal console)
	C-M-F1 -> C-M-F6: Switch to tty
	C-M-F7: Back to GUI Desktop

--------------
Download from internet:
	curl -L <download_link>: Download file from server link
	wget <donwload_link>: Download file from server link

--------------
Compress, decompress file commands:
	tar (ref: http://www.thegeekstuff.com/2010/04/unix-tar-command-examples/)
	Compress files:
		tar cvf archive_name.tar dirname/ (Only packaging not compressing)
		tar cvfz archive_name.tar.gz dirname/ (compressed by gzip, .tgz is same as .tar.gz)
		tar cvfj archive_name.tar.bz2 dirname/ (compressed by bzip, .tbz, .tb2 is same as .tar.bz2) (bzip2 compress, decompress longer than gzip but smaller size file)
	Decompress file:
		tar xvf archive_name.tar
		tar xvfz archive_name.tar.gz
		tar xvfj archive_name.tar.bz2
	List compressed files:
		tar tvf archive_name.tar
		tar tvfz archive_name.tar.gz
		tar tvfj archive_name.tar.bz2
	-c : create archive
  -C: decompress to specified directory
	-x : extract (decompress) archive
	-t : list archive
	-v : verpose (view details process)
	-f <arhive_file_name> : following is archive file name (NOT device)
	-z: gzip compress method
	-j: bzip2 compress method
  --mode <PERMISSION_ARGUMENT> (like chmod argument)
	
--------------
File commands:

	ls <./path/dir>: show list files in folder at path passed
		-a: show all (include hidden)
		-R: recursive list (show recursively in every folder in that path passed
		-r: Reverse order list
		-t: sort by last modified
		-S: sort by file size
		-l: show as long listing format, show symbolink details also
		-d: show directories only
	cd </path/dir> : change current path to path passed
	cd .. : change current path to parent
	cd <./path/dir> : change current path to path passed starting from current path
	cd - : change current path to previous path
	cd : change current path to home user path
	mkdir <path_to_folder>: create folder name at path passed
    -p: to create parent folder if not exists (useful to create folder chain)
	touch <path_to_file>: create file with path and file name passed
	cat <path_to_file>: output file content on command line screen
	less <path_to_file>: view file (like vim but not full featured like it)
	head <path_to_file>: show first 10 (default) lines of file
	tail <path_to_file>: show last 10 (default) lines of file
		-f: show and update when file changed immediately
		note: can use "less +F <path_to_file>" similar but can't move backward
	cp </path/file_name> </path1/file_name_1>: copy file from <1> to <2> with file name passed
		-r/R: copy recursive files and directories
		-f: force override files without prompt
		-i: prompt before overrides
		-n: do not override files
		-u: only copy when source file is newer than destination file or destination file doesn't exists
	mv </path/file_name> </path1/file_name_1>: move file from <1> to <2> with file name passed or rename file/directory (if path passed not changed)
		-r/R: copy recursive files and directories
		-f: force override files without prompt
		-i: prompt before overrides
		-n: do not override files
		-u: only move when source file is newer than destination file or destination file doesn't exists
	rm <path_to_file>: remove file at path passed
		-r/R: remove directories and files recursively
		-f: force delete all files (despite non existed files)
		-i: prompt every file removal
	
	ln -s <path_to_file/directory> <soft_link> : create symbolic (soft) link to path of file/directory passed. (more memory to save because of adding inode, if original file die, symbolic link will be invalid)
	ln <path_to_file> <soft_link> : create hard link to path of file (only file) passed. (save memory because use one inode generally, if file still has one inode, it will exists (means if original file or hard link dies, it's ok and if original file changed path, hard link will be updated)

--------------
Bash commands:
	env: show all environment variables
	export <VARIABLE_NAME>=<value>: assign value to variable
	
--------------
Search file commands:
	grep <pattern> <path_to_files>: Search text pattern in files passed 
		-i: case insensitive
		-r: recursive search in directories
	 	-n: show line number
	   	-l: (lower-case L) can be added to just give the file name of matching files.
	   	-e (--regexp=PATTERN): use PATTERN for matching

	find <path_to_folder> <option>:
		<option>:
			-name (-iname will ignore case) <file_name>: search file name (can use wildcard to search)
      -type (
        f: regular file
        d: directory
        l: symbolink
        c: character device
        b: block device
      )
      -size (
        c: bytes
        k: kilobytes
        M: Megabytes
        G: Gigabytes
        b: 512-byte blocks
      )
    Note: when use "find" with folders should use name with double quotes ("")

  executing and combining find commands
    (1) find <find_params> -exec <command_and_params> {} \;
    (2) find <find_params> -exec <command_and_params> {} +
    {}: used as placeholder for the files that find matches
    \; : used so that find knows where the command ends and command will be executed with each file founded at a time,
    + : like above but used to executed command with all file founded as parameters at a time


  find text in filtered files
	W1: grep -rnw '/path/to/somewhere/' -e 'pattern'
		-r or -R is recursive,
		-n is line number, and
		-w stands for match the whole word.
	   	-l (lower-case L) can be added to just give the file name of matching files.
	   	-i stands for ignore case (optional in your case).

	   	More Examples:
		   	grep --include=\*.{c,h} -rnw '/path/to/somewhere/' -e "pattern"
		   	grep --exclude=*.o -rnw '/path/to/somewhere/' -e "pattern"
		   	grep --exclude-dir={dir1,dir2,*.dst} -rnw '/path/to/somewhere/' -e "pattern"

	W2: find '/path/to/folder' -name '*.js' -print -exec grep -i 'string to search for' {} \;
	W3: find '/path/to/folder' -type f | xargs grep 'text-to-find-here'
		Note: if file name has funny character such as white-space. Use the following:
			find '/path/to/folder' -type f -print0 | xargs grep -0 'text-to-find-here' 


	

