document.getElementById('checkForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const response = await fetch('/checkPrivilege', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${username}`
    });
    const data = await response.text();
    if (data === 'UNKNOWN'){
        document.getElementById('user_name_2').textContent = username;
        document.getElementById('privilege').textContent = data;      
        document.getElementById('result2').classList.remove('hidden');
    } else {
        document.getElementById('user_name_1').textContent = username;
        document.getElementById('privilege').textContent = data;
        document.getElementById('result1').classList.remove('hidden');
    }
    document.getElementById('button_back').classList.remove('hidden');
    document.getElementById('checkForm').classList.add('hidden');
});