function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function addEventToCalendar(data) {
  const calendarId = 'b6d552a065b92516d4af5c10e1e2b70070da63d0e84dbb3111518a92fe067f5b@group.calendar.google.com';  // ここにGoogleカレンダーIDを入力
  const calendar = CalendarApp.getCalendarById(calendarId);
  
  const startDateTime = new Date(data.startDateTime);
  const endDateTime = new Date(data.endDateTime);
  
  const description = `
LINEの名前: ${data.lineName}
お名前: ${data.name}
電話番号: ${data.phone}
メニュー: ${data.selectedSymptom}
訪問回数: ${data.visitCount}
メッセージ: ${data.message}
  `;

  calendar.createEvent(data.summary, startDateTime, endDateTime, {
    description: description.trim()
  });

  return { status: 'success' };
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const result = addEventToCalendar(data);
    return ContentService.createTextOutput(JSON.stringify(result))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
