---
title: "GitHubにPushできない時の対処法"
slug: erorr_git_push
date: 2024-01-04T13:54:18
categories: ["プログラミング"]
tags: ["Git", "GitHub"]
---
こんにちは。しんやです。

GitHubにPushするときにエラーにハマって解決に時間がかかったので、解決方法を共有します。

以下のように、メインブランチへPushしようとした時に、エラーとなります。

```
ユーザー名@パソコン名 newportfolio % git push origin main
To https://github.com/ユーザー名/newportfolio.git
 ! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'https://github.com/ユーザー名/newportfolio.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

「git pull」コマンドを使用しても、以下のとおりエラーとなります。

```
ユーザー名@パソコン名 newportfolio % git pull origin main
From https://github.com/ユーザー名/newportfolio
 * branch            main       -> FETCH_HEAD
hint: Diverging branches can't be fast-forwarded, you need to either:
hint: 
hint:   git merge --no-ff
hint: 
hint: or:
hint: 
hint:   git rebase
hint: 
hint: Disable this message with "git config advice.diverging false"
fatal: Not possible to fast-forward, aborting.
```

「git pull」コマンドに「rebase」オプションを付けて実行します。

```
ユーザー名@パソコン名 newportfolio % git pull origin main --rebase
From https://github.com/ユーザー名/newportfolio
 * branch            main       -> FETCH_HEAD
warning: skipped previously applied commit d1d955e
hint: use --reapply-cherry-picks to include skipped commits
hint: Disable this message with "git config advice.skippedCherryPicks false"
Successfully rebased and updated refs/heads/main.
```

再度、Pushします。

```
ユーザー名@パソコン名 newportfolio % git push origin main
Enumerating objects: 9, done.
Counting objects: 100% (9/9), done.
Delta compression using up to 4 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (5/5), 1.22 KiB | 1.22 MiB/s, done.
Total 5 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To https://github.com/ユーザー名/newportfolio.git
   d26baaf..0a55d48  main -> main
```

以上です。

誤りや質問などありましたらお気軽にコメントしてください。
