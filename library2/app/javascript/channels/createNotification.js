App.createNotification = App.cable.subscriptions.create('CreateNotificationChannel',{
    received: function(data){
        window.alert(data.message);
    }
});