import mimetypes
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

mimetypes.add_type("text/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("video/mp4", ".mp4")
mimetypes.add_type("image/webp", ".webp")

class LocalHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

os.chdir(Path(__file__).resolve().parent)
httpd = ThreadingHTTPServer(("127.0.0.1", 8766), LocalHandler)
print("Local preview: http://127.0.0.1:8766")
httpd.serve_forever()
