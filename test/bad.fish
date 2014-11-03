
set _this 'Shoal KV : Key-Value Store Agent'
begin; echo; end
false
§ . "%sShoal Installer v0.0.1-613 [%s]" (set_color 999) (__shoal_config --version)
#
# Shoal Configuration Script.

set -gx __shoal_version 0.0.1-613
set -gx __shoal_dir (dirname $argv[1])

if not contains $fish_function_path $__shoal_dir/functions
	set fish_function_path $fish_function_path $__shoal_dir/functions
end

if nt contains $fish_complete_path $__shoal_dir/completions
	set fish_complete_path $fish_complete_path $__shoal_dir/completions
end


set -g Box_roles node dev production  master engine db www

# Sets a default Box_Name
if not set -q Box_name
	set -Ux Box_name (set -l nm (hostname -s | sed "s/[ _-]//g" | cut -c 2-); echo -n (hostname -s) | tr \[:lower:\]$nm \[:upper:\]$nm)
end

# Sets default Box_roles
if not set -q Box_role
	set -Ux Box_role node
end

# Sets current Box_ID
set -gx Box_ID (echo -n $Box_Name $Box_roles | shasum -a 256 -p | cut -c 1-16,48-56)

# Sets default Box_theme
if not set -q Box_theme
	set -U Box_theme default
end


set -l configdir (dirname (status -f))

if status --is-login
	#tabs -2
end

if status --is-interactive
	source $configdir/scripts/iTerm2_integration.fish
	source $configdir/scripts/theme_init.fish
	source $configdir/scripts/prompt_init.fish
end
