
function GitPull {
    param (
        [string[]]$b = "master"
    )
    git reset --hard HEAD
    git checkout $b
    git branch
    $gitPullOutput = git pull
    if ($gitPullOutput -like "*Already up to date.*") {
        $confirm = Read-Host "Git pull is already up to date.`nPress ENTER to continue or 'n' to stop"
        if($confirm -eq 'n'){
            exit
        }
    }
}


   # Commands for building the provider_web app in production environment
Write-Host "Building portal_provider app for production environment..."
# Add your commands here

Set-Location D:\Hazem\pink\portal_provider

GitPull -b

npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Script execution stopped."
    exit
}
7z a dist/prod.zip ./dist/prod/
scp ./dist/prod.zip pinkproduction2:/var/www/pink-web/prod.zip
ssh pinkproduction2 "cd /var/www/portal_provider/ && rm -rf prod_bc && mv prod prod_bc && unzip prod.zip && sudo chown -R ubuntu:www-data prod && echo "$(Get-date) - pink-web/prod" >> log.log"

Write-Host "`n`n$selectedApp is succesufuly DEPLOYED on $selectedEnv at $(Get-date)"
