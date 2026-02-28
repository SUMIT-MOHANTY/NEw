#!/bin/bash

set -e

echo "=== CalcApp Deployment Script ==="
echo "Environment: sandbox"

AZURE_APP_NAME="calcapp-sandbox"
RESOURCE_GROUP="calcapp-rg-sandbox"
SLOT="staging"

echo "Logging into Azure..."
az login --service-principal -u "$AZURE_SP_APP_ID" -p "$AZURE_SP_PASSWORD" --tenant "$AZURE_TENANT_ID" || true

echo "Selecting subscription..."
az account set --subscription "$AZURE_SUBSCRIPTION_ID"

echo "Deploying backend to App Service..."
az webapp deployment source config-local-git     --name "$AZURE_APP_NAME"     --resource-group "$RESOURCE_GROUP"     --slot "$SLOT" || echo "Source control already configured"

echo "Setting app settings..."
az webapp config appsettings set     --name "$AZURE_APP_NAME"     --resource-group "$RESOURCE_GROUP"     --slot "$SLOT"     --settings NODE_ENV=production PORT=3000 DATABASE_PATH=/home/site/db/calcapp.db

echo "Restarting App Service..."
az webapp restart     --name "$AZURE_APP_NAME"     --resource-group "$RESOURCE_GROUP"     --slot "$SLOT"

echo "Checking deployment health..."
sleep 10
HEALTH_STATUS=$(az webapp show     --name "$AZURE_APP_NAME"     --resource-group "$RESOURCE_GROUP"     --slot "$SLOT"     --query "state"     --output tsv)

if [ "$HEALTH_STATUS" == "Running" ]; then
    echo "Deployment successful! App is running."
    echo "URL: https://$AZURE_APP_NAME.azurewebsites.net"
else
    echo "Warning: App state is $HEALTH_STATUS"
fi

echo "=== Deployment Complete ==="
