# Backup
curl https://rclone.org/install.sh | bash
rclone config
mkdir /mnt/tdrive
apt update
apt install -y fuse3
rclone mount tdrive: /mnt/tdrive/ --daemon
OR
rclone mount tdrive: /mnt/tdrive/ --daemon --daemon-wait 0
OR
mkdir -p /mnt/local01/rclonecache
LOGFILE=/home/rclone.log
RCLONE_ARGS=(
	--log-file="$LOGFILE"
	--cache-dir /mnt/local01/rclonecache
	mount
	tdrive:/
	--bwlimit 8M	
	--vfs-cache-mode full
	--vfs-cache-poll-interval 10m
	--vfs-cache-max-size 8G
	--vfs-cache-max-age 10h
	--vfs-write-back 1h
	--allow-other
	--umask 0
	-vv
	/mnt/tdrive
)
rclone "${RCLONE_ARGS[@]}" 2>&1 >> "$LOGFILE" &


xz --decompress --stdout -T0 /mnt/tdrive/rclone-image/us-200gb-u2205-nvme-66-94-107-76.xz | dd of=/dev/sda status=progress