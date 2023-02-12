set current dir to current opening file:
	in command mode type: ":cd %:p:h" (set for all windows (global)) OR
	":lcd %:p:h" ((for current window) (local)) OR
	:set autochdir (then set autochdir! if you don't want autochdir always after that)

move current windows to new tab
  ctrl+w shift-t (means T uppercase)
copy current windows to new tab
  :tab sp
turn off color highlighting in diff mode
  :set hl+=A:none,C:none,D:none,T:none 
turn on
  :set hl&

copy output extend command (:…): redir @* | … | redir END	(khi dán dùng "*p)

copy content to vim command mode:	"<ctrl+r>""
(where "" stands for default register."	http://stackoverflow.com/questions/906535/how-to-copy-yanked-text-to-vi-command-prompt)

:set noswapfile :	Bỏ vụ phát sinh swap file	

:set selectmode=cmd :	khi bôi đen bấm y để lưu vào mem	

:windo diffthis / windo diffoff : khi đã mở 2 file lên thì dùng lệnh này để chuyển mode diff hoặc ngược lại	
:e ++ff=unix (hoặc vim -b filename):	mở lại file với định dạng trên unix (để nhận biết line feed ^M)	
:set list: Hiện kí tự hết dòng ($)	
