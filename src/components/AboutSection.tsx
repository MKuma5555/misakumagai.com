import { about } from '@/content/about'

/**
 * ja版のAbout。en版はJourneySectionを使うので、ここはja専用。
 *
 * 色ブロックは画面の左端から始めて、右上だけ大きく丸める。
 * 中身は .block-section の --inset（他セクションより深い余白）から。
 * 写真はパネルの右端をまたいで、画面外へ少し切れる。
 * ・パネルの幅   … calc(100% - 130px)
 * ・切れる量     … about-grid の calc(100% + 190px) のうち130pxを超えたぶん
 */
export default function AboutSection() {
  return (
    <section id="about" className="block-section py-24 md:py-32">
      <div
        data-reveal
        className="relative w-[calc(100%-130px)] rounded-tr-[150px] bg-[#b9c8ad] py-16 md:w-[calc(100%-130px)] md:rounded-tr-[200px] md:py-[88px]"
      >
        {/* パネルより190px広く取り、その差ぶんだけ写真が右へはみ出す。
           パネルの幅が calc(100%-130px) なので、はみ出しは 190-130 = 画面外へ60px。
           右の余白（pr）は縦積みになるSPだけ。md以上で付けると写真が中に戻る。 */}
        <div className="grid w-full items-center gap-8 pl-[var(--inset)] pr-[var(--inset)] md:w-[calc(100%+190px)] md:grid-cols-[.86fr_1.14fr] md:gap-16 md:pr-0">
          <div className="max-w-[560px]">
            <p className="font-mono text-[10px] tracking-[.2em] text-[#4a5e3e]">
              01 / わたしについて
            </p>

            <h2 className="mt-5 font-serif text-[1.9rem] leading-[1.35] tracking-[-.02em] md:text-[2.4rem]">
              {about.lead.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </h2>

            {about.body.map((p) => (
              <p key={p} className="mt-4 text-[15px] leading-[2.1] text-[#3a382e]">{p}</p>
            ))}

            <div className="mt-8 flex flex-wrap gap-2">
              {about.tags.map((t) => (
                <span key={t} className="rounded-full bg-[#d6dfc9] px-4 py-[7px] text-xs text-[#33452a]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="h-[300px] overflow-hidden rounded-lg bg-[#cbc7b6] md:h-[500px]">
            <img
              src={about.photo.src}
              alt={about.photo.alt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
