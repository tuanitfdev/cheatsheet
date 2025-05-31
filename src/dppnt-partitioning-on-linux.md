# Partitioning using parted on linux
To split a partition on an Ubuntu Server 22.04, you can use command-line tools such as `fdisk`, `parted`, or `gdisk`. Here is a step-by-step guide using `parted`, which is a versatile tool for handling disk partitions.

### Warning
Splitting a partition involves resizing it and creating new partitions in the freed space. This can lead to data loss if not done carefully. Always back up your important data before proceeding.

### Step-by-Step Guide

1. **Open a Terminal:**
   Ensure you have root or sudo privileges to make changes to disk partitions.

2. **List the Partitions:**
   Use the `lsblk` command to list all the block devices and their partitions:
   ```sh
   lsblk
   ```

3. **Identify the Partition to Split:**
   Identify the disk and the specific partition you want to split. For example, `/dev/sda1`.

4. **Resize the Partition:**
   Use `parted` to resize the partition. First, start `parted` on your disk:
   ```sh
   sudo parted /dev/sda
   ```

   Inside `parted`, resize the partition. For example, if you want to resize `/dev/sda1` to 50GB:
   ```sh
   (parted) resizepart 1 50GB
   ```

   Adjust the size according to your requirements.

5. **Create a New Partition:**
   With the remaining free space, create a new partition. Still inside `parted`, use the following commands:
   ```sh
   (parted) mkpart primary 50GB 100%
   ```

   This creates a new partition in the remaining space. Adjust the start and end points as necessary.

6. **Quit `parted`:**
   Once done, exit `parted`:
   ```sh
   (parted) quit
   ```

7. **Format the New Partition:**
   Format the new partition with a filesystem of your choice, for example, ext4:
   ```sh
   sudo mkfs.ext4 /dev/sda2
   ```

8. **Update `/etc/fstab`:**
   If you want the new partition to be mounted automatically at boot, you need to update `/etc/fstab`. First, get the UUID of the new partition:
   ```sh
   sudo blkid /dev/sda2
   ```

   Then, edit `/etc/fstab` to include the new partition. Open `/etc/fstab` with a text editor:
   ```sh
   sudo nano /etc/fstab
   ```

   Add a line similar to the following:
   ```
   UUID=your-new-partition-uuid /mnt/new-part ext4 defaults 0 2
   ```

   Replace `your-new-partition-uuid` with the actual UUID from the `blkid` command and `/mnt/new-part` with your desired mount point.

9. **Mount the New Partition:**
   Create the mount point directory and mount the new partition:
   ```sh
   sudo mkdir /mnt/new-part
   sudo mount /mnt/new-part
   ```

10. **Verify:**
    Verify that the new partition is mounted correctly:
    ```sh
    df -h
    ```

### Notes
- Always ensure you have backups of your data.
- Be cautious with partition operations as they can lead to data loss if done incorrectly.
- If you are unfamiliar with these operations, consider testing them in a virtual environment first.

By following these steps, you should be able to split a partition on your Ubuntu Server 22.04 successfully.