export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
    };
    location: {
        name: string;
    };
    image: string;
}

export interface RootState {
    characters: Character[];
    loading: boolean;
    error: string | null;
}