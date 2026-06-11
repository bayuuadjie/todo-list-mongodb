const taskProgress = document.getElementById('task-progress');
const taskDone = document.getElementById('task-done');

const hapusAktivitas = async (activity) => {
    const konfirmasi = confirm(`Apakah Anda yakin ingin menghapus aktivitas "${activity}"?`);
    if (!konfirmasi) return;
    
    try { 
        const response = await fetch(`/api/activities/${activity}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert('Aktivitas berhasil dihapus');
            fetchActivities();
        } else {
            alert('Gagal menghapus aktivitas');
        }
    } catch (error) {
        console.error('Gagal menghapus aktivitas:', error);
    }
}

const updateAktivitas = async (activity) => {
    try {
        const response = await fetch(`/api/activities/${activity}`, {
            method: 'PUT'
        });
        if (response.ok) {
            alert('Aktivitas berhasil diperbarui');
            fetchActivities();
        } else {
            alert('Gagal memperbarui aktivitas');
        }
    } catch (error) {
        console.error('Gagal memperbarui aktivitas:', error);
    }
}

const fetchActivities = async () => {
    try {
        taskProgress.innerHTML = '';
        taskDone.innerHTML = '';

        const response = await fetch('/api/activities');
        const activities = await response.json();

        activities.forEach((progress, i) => {
            if (progress.status == 'progress'){
                    const htmlTableProgress = `
                    <tr>
                        <td class="p-4">${progress.activity}</td>
                        <td class="p-4">${progress.date}</td>
                        <td class="p-4">
                            <button id="done-${i}" class="bg-blue-500 px-4 py-2 rounded-lg m-1" onclick="updateAktivitas('${progress.activity}')"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
                            <button id="delete-${i}" class="bg-red-500 px-4 py-2 rounded-lg m-1" onclick="hapusAktivitas('${progress.activity}')"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H28₀v52₀h4₀₀v-5₂₀ZM36₀-₂₈₀h8₀v-3₆₀h-8₀v3₆₀Zm16₀ ₀h8₀v-3₆₀h-8₀v3₆₀ZM28₀-7₂₀v5₂₀-5₂₀Z"/></svg></button>
                        </td>
                    </tr>
                    `
                    taskProgress.innerHTML += htmlTableProgress;
                } else if (progress.status == 'done') {
                    const htmlTableDone = ` 
                    <tr>
                        <td class="p-4">${progress.activity}</td>
                        <td class="p-4">${progress.date}</td>
                        <td class="p-4">
                            <button id="done-${i}" class="bg-blue-500 px-4 py-2 rounded-lg m-1" onclick="updateAktivitas('${progress.activity}')"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg></button>
                            <button id="delete-${i}" class="bg-red-500 px-4 py-2 rounded-lg m-1" onclick="hapusAktivitas('${progress.activity}')"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H28₀v52₀h4₀₀v-5₂₀ZM36₀-₂₈₀h8₀v-3₆₀h-8₀v3₆₀Zm16₀ ₀h8₀v-3₆₀h-8₀v3₆₀ZM28₀-7₂₀v5₂₀-5₂₀Z"/></svg></button>
                        </td>
                    </tr> 
                    `
                    taskDone.innerHTML += htmlTableDone;
                }
            });
            

    } catch (error) {
        console.error('Gagal mengambil data dari sever:', error);
    }
}

fetchActivities();