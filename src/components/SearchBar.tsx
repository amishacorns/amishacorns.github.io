type Props = {
    onSearchInput: (e: Event) => void;
    query: () => string;
    setQuery: (value: string) => void;
    placeholderText: string;
};

export default function SearchBar({ onSearchInput, query, setQuery, placeholderText }: Props) {
    return (<div class="relative">
        <svg class="absolute size-6 left-2 top-[0.45rem] stroke-neutral-500 pointer-events-none">
            <use href={`/ui.svg#search`} />
        </svg>
        <input name="search" type="text" value={query()} onInput={onSearchInput} autocomplete="off" spellcheck={false} placeholder={placeholderText} class="w-full px-10 py-1.5 rounded outline-none placeholder-neutral-500 text-white bg-white/10 hover:bg-white/15 focus:bg-white/15 border border-white/10 focus:border-white/40" />
        {query().length > 0 && (
            <button
                onClick={() => setQuery("")}
                class="absolute flex justify-center items-center h-full w-10 right-0 top-0 stroke-neutral-500 hover:stroke-neutral-300"
            >
                <svg class="size-5">
                    <use href={`/ui.svg#x`} />
                </svg>
            </button>
        )}
    </div>)
}
