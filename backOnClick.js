function back(){
    const data = document.getElementById('privilege').textContent;
    if (data === 'UNKNOWN'){     
        document.getElementById('result2').classList.add('hidden');
    } else {
        document.getElementById('result1').classList.add('hidden');
    }
    document.getElementById('button_back').classList.add('hidden');
    document.getElementById('checkForm').classList.remove('hidden');
    document.getElementById('username').value ='';
}