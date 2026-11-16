import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { catalog, categories, visibleEntries, type Category, type Entry } from './catalog'
import './style.css'

const nav = ['Menu', 'Recherche', 'MAJ', 'ADMIN', 'STAT', 'MIX', 'Déconnexion', 'LOCAL']
const icons: Record<string, string> = { Menu:'M3 5h18M3 12h18M3 19h18', Recherche:'M21 21l-5-5m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z', Déconnexion:'M13 4h7v16h-7m-9-8h12m-4-4 4 4-4 4', VUS:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm13 0a3 3 0 1 0-6 0 3 3 0 1 0 6 0Z' }
function Icon({ name }: { name: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[name]}/></svg>
}

function App() {
  const [category, setCategory] = useState<Category>('US')
  const [search, showSearch] = useState(false)
  const [query, setQuery] = useState('')
  const [detail, setDetail] = useState<Entry | null>(null)
  const [panel, setPanel] = useState('')
  const field = useRef<HTMLInputElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const entries = visibleEntries(catalog, category, query)
  const count = (group: Category) => catalog.filter(entry => entry.category === group).length
  useEffect(() => { if (search) field.current?.focus() }, [search])
  useEffect(() => {
    if ((detail || panel) && !dialog.current?.open) dialog.current?.showModal()
  }, [detail, panel])
  function select(group: Category) { setCategory(group); setQuery(''); window.scrollTo(0,0) }
  function dock(action: string) {
    if (action === 'Recherche') {
      if (search) field.current?.focus()
      else showSearch(true)
    } else setPanel(action)
  }
  return <>
    <header className="hero"><img src="/logo-v2.webp" alt="MerylMoviBox — Top films, séries & vinyles" /></header>
    <div className="status">
      <button aria-label="Voir les films vus" className="yellow" onClick={() => select('VUS')}><Icon name="VUS" /></button>
      <span className="counts"><span className="version">V3</span> <span>Films <b>{count('US')+count('FR')}</b></span> <span>Séries <b>{count('SÉRIES')}</b></span> <span>LP <b>{count('LP')}</b></span></span>
      <button className="small-add yellow" aria-label="Ajouter un film" onClick={() => setPanel('Ajouter un film')}>+</button>
      <small>Catalogue de démonstration · Firebase non connecté</small>
    </div>
    <main>
      {search && <form role="search" onSubmit={event => event.preventDefault()} className="search">
        <label htmlFor="query">Rechercher dans {category}</label>
        <input ref={field} id="query" type="search" value={query} placeholder="Titre ou année" onChange={event => setQuery(event.target.value)} />
        <button type="button" onClick={() => {showSearch(false); setQuery('')}} aria-label="Fermer la recherche">×</button>
      </form>}
      <ul className="catalog" aria-label={`Catalogue ${category}`}>
        {!query && category === 'US' && <li><button className="cover add" aria-label="Ajouter un film à la grille" onClick={() => setPanel('Ajouter un film')}>+</button></li>}
        {entries.map(entry => <li key={entry.title}><button className="cover" onClick={() => setDetail(entry)} style={{background:`radial-gradient(ellipse at 68% 24%, ${entry.colors[1]}aa, transparent 46%), linear-gradient(158deg, ${entry.colors[0]}, #070a15 88%)`}}><span className="cover-year">{entry.year}</span><span className="cover-title">{entry.title}</span></button></li>)}
      </ul>
      {!entries.length && <p className="empty" role="status">{query ? 'Aucun résultat.' : 'Aucun titre de démonstration dans cette rubrique.'}</p>}
    </main>
    <footer>
      <nav className="categories" aria-label="Rubriques">{categories.map(group => <button key={group} aria-pressed={group === category} onClick={() => select(group)}>{group}</button>)}</nav>
      <nav className="dock" aria-label="Outils">{nav.map(action => <button key={action} aria-label={action} onClick={() => dock(action)}>{icons[action] ? <Icon name={action}/> : action}</button>)}</nav>
    </footer>
    <dialog ref={dialog} onClose={() => {setDetail(null);setPanel('')}} aria-labelledby="dialog-title">
      <h2 id="dialog-title">{detail?.title ?? panel}</h2>
      {detail ? <p>{detail.year} · {detail.category}{detail.seen ? ' · Vu' : ''}</p>
        : panel === 'Menu' ? <p>Choisis une rubrique en bas de l’écran ou ouvre la recherche pour filtrer les titres.</p>
        : panel === 'LOCAL' ? <p>Accueil de démonstration. Aucun compte ni aucune bibliothèque Firebase n’est connecté.</p>
        : <p>Cette fonction n’est pas encore active dans la V3.</p>}
      <form method="dialog"><button>Fermer</button></form>
    </dialog>
  </>
}

createRoot(document.getElementById('root')!).render(<App />)
