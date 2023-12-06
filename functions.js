// Mevcut tarihi almak için fonksiyon
export const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate;
};

// İki tarih arasındaki farkı hesaplamak için fonksiyon
export const calculateDateDifference = (startDate, endDate) => {
  const diffInMilliseconds = Math.abs(endDate - startDate);
  const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    if (days <= 3) {
      return `${days} gün önce`;
    } else {
      return startDate.toLocaleString(); // Eğer 3 günden fazla ise, önceki tarihi değer olarak döndür
    }
  } else if (hours > 0) {
    return `${hours} saat önce`;
  } else if (minutes > 0) {
    return `${minutes} dakika önce`;
  } else {
    return "Şimdi";
  }
};
