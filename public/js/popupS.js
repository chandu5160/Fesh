popupS.alert({
    content: 'Hello'
}); 
popupS.alert({
    title:   'I am an',
    content: 'Alert'
});
//Confirm
popupS.confirm({
    content:     '<b>Do you like what you see?</b>',
    labelOk:     'Yes',
    labelCancel: 'No',
    onSubmit: function() {
        console.log(':)');
    },
    onClose: function() {
        console.log(':(');
    }
});
//Prompt

popupS.prompt({
    content:     'What is your name?',
    placeholder: '>>>',
    onSubmit: function(val) {
        if(val) {
            popupS.alert({
                content: 'Hello, ' + val
            });
        } else {
            popupS.alert({
                content: ':('
            });
        }
    }
});
//Model
popupS.modal({
    title:   'Himalaya',
    content: {
        tag: 'img#himalaya.picture',
        src: 'http://static.hdw.eweb4.com/media/wallpapers_1920x1080/nature/1/1/himalaya-nature-hd-wallpaper-1920x1080-6944.jpg'
    }
});

//ajax
popupS.ajax({
    title:   'Himalaya',
    ajax: {
        url: 'http://static.hdw.eweb4.com/media/wallpapers_1920x1080/nature/1/1/himalaya-nature-hd-wallpaper-1920x1080-6944.jpg'
    }
});