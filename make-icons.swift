// アイコン生成: swift make-icons.swift
// 3 枚のタブのうち、左だけ塗りつぶし（アクティブ）、残りは輪郭だけ（外した）で表す。
import AppKit

func draw(size: Int) -> Data {
    let s = CGFloat(size) / 128
    let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: size, pixelsHigh: size,
                               bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
                               colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)

    NSColor(red: 0.06, green: 0.46, blue: 0.43, alpha: 1).setFill()
    NSBezierPath(roundedRect: NSRect(x: 0, y: 0, width: 128 * s, height: 128 * s),
                 xRadius: 26 * s, yRadius: 26 * s).fill()

    func rounded(_ x: CGFloat, _ y: CGFloat, _ w: CGFloat, _ h: CGFloat, _ r: CGFloat) -> NSBezierPath {
        NSBezierPath(roundedRect: NSRect(x: x * s, y: y * s, width: w * s, height: h * s),
                     xRadius: r * s, yRadius: r * s)
    }

    // ウィンドウ本体とアクティブなタブ（白でつなげる）
    NSColor.white.setFill()
    rounded(18, 22, 92, 64, 8).fill()
    rounded(18, 74, 34, 32, 7).fill()

    // 外したタブ（薄く）
    NSColor.white.withAlphaComponent(0.4).setFill()
    rounded(57, 91, 24, 15, 5).fill()
    rounded(86, 91, 24, 15, 5).fill()

    NSGraphicsContext.restoreGraphicsState()
    return rep.representation(using: .png, properties: [:])!
}

let dir = URL(fileURLWithPath: CommandLine.arguments[0]).deletingLastPathComponent()
    .appendingPathComponent("icons")
try FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
for size in [16, 32, 48, 128] {
    try draw(size: size).write(to: dir.appendingPathComponent("icon\(size).png"))
}
print("icons written to \(dir.path)")
