# Exercice de finalisation de bascule Redux

Nous avons connecté Redux à notre grappe React grâce à un `<Provider>` autour de celle-ci, et avons exploité ça dans `<HomeScreen>` en utilisant `useAppSelector()` et un callback de sélection sur-mesure.

À vous de faire de même pour `<TrackerScreen>`, ce qui va permettre de le découpler du module `store.ts`, actuellement exploité en direct, et vu que son export par défaut a changé, on n’y trouve de toutes façons plus les valeurs qui nous intéressent…

## Tâches

1. Connectez `<TrackerScreen>` au _store_ grâce à un `useAppSelector()` adapté.
2. Fournissez la fonction de sélection appropriée pour cette connexion ; comme elle est un peu moins concise que dans `HomeScreen`, vous pouvez si vous le souhaitez en faire une fonction tierce hors du composant. Attention toutefois : vous devrez probablement explicitement typer son argument.
3. Vérifiez que `<TrackerScreen>` est de nouveau affiché correctement
4. Pensez à nettoyer l’import de `store.ts` (l'export par défaut est désormais superflu, ESLint devrait vous chercher des noises là-dessus de toutes façons).
