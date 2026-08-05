import qrcode

# Reemplaza esta URL con la que te dio Vercel
url_proyecto = "https://diagrama-interactivo-xi.vercel.app/" 

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=15,
    border=4,
)

qr.add_data(url_proyecto)
qr.make(fit=True)

imagen = qr.make_image(fill_color="black", back_color="white")
imagen.save("codigo_qr_final.png")
print("¡Código QR generado con éxito!")
