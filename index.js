import fs from "fs"
import gm from "gm"

const folderPath = "<replace>"
const maskPath = folderPath + "mask.png"
const borderColor = "black"
const borderWidth = 3
const borderWidth2 = borderWidth * 2
const borderRadius = 29

const main = async (file) => {
	const filePath = folderPath + file

	// get size of original image
	const size = await new Promise((resolve, reject) => {
		gm(filePath)
			.size((err, size) => {
				if (err) {
					reject(err)
					return
				}
				resolve(size)
			})
	})

	// create mask with rounded corners
	await new Promise((resolve, reject) => {
		gm(size.width, size.height, "transparent")
			.fill(borderColor)
			.draw(`roundrectangle 0, 0, ${size.width}, ${size.height}, ${borderRadius}, ${borderRadius}`)
			.write(maskPath, err => {
				if (err) reject(err)
				resolve()
			})
	})

	// apply mask with rounded corners on original image
	await new Promise((resolve, reject) => {
		gm(filePath)
			.compose("CopyOpacity")
			.composite(maskPath)
			.write(filePath, err => {
				if (err) {
					reject(err)
					return
				}
				resolve()
			})
	})

	// create border around original image
	await new Promise((resolve, reject) => {
		gm(filePath)
			.background(borderColor)
			.flatten()
			.borderColor(borderColor)
			.border(borderWidth, borderWidth)
			.write(filePath, err => {
				if (err) {
					reject(err)
					return
				}
				resolve()
			})
	})

	// create larger mask with rounded corners
	await new Promise((resolve, reject) => {
		gm(size.width + borderWidth2, size.height + borderWidth2, "transparent")
			.fill(borderColor)
			.draw(`roundrectangle 0, 0, ${size.width + borderWidth2}, ${size.height + borderWidth2}, ${borderRadius}, ${borderRadius}`)
			.write(maskPath, err => {
				if (err) reject(err)
				resolve()
			})
	})

	// apply larger mask with rounded corners on bordered image
	await new Promise((resolve, reject) => {
		gm(filePath)
			.compose("CopyOpacity")
			.composite(maskPath)
			.write(filePath, err => {
				if (err) {
					reject(err)
					return
				}
				resolve()
			})
	})

}

const files = fs.readdirSync(folderPath)
for (const file of files) {
	if (file.endsWith(".png")) {
		console.log(file)
		await main(file)
	}
}
fs.unlinkSync(maskPath)
