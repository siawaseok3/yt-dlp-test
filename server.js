import { exec } from "child_process";

/**
 * 動画IDからyt-dlpでメタ情報取得
 * @param {string} videoId YouTube動画ID
 * @returns {Promise<Object>} 動画のメタ情報(JSON)
 */
function getYoutubeVideoInfo(videoId) {
  return new Promise((resolve, reject) => {
    // yt-dlp コマンドを動画URL付きでJSON出力
    const cmd = `yt-dlp -j https://www.youtube.com/watch?v=${videoId}`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`yt-dlp error: ${error.message}`));
        return;
      }
      if (stderr) {
        console.warn(`yt-dlp warning: ${stderr}`);
      }
      try {
        const info = JSON.parse(stdout);
        resolve(info);
      } catch (parseError) {
        reject(new Error(`JSON parse error: ${parseError.message}`));
      }
    });
  });
}

// 実行例
(async () => {
  try {
    const videoId = "0T9W_fER04w"; // 任意のYouTube動画IDに変えてください
    const info = await getYoutubeVideoInfo(videoId);
    console.log("動画タイトル:", info.title);
    console.log("再生回数:", info.view_count);
    console.log("アップロード日時:", info.upload_date);
    console.log("チャンネル名:", info.uploader);
  } catch (error) {
    console.error(error);
  }
})();
